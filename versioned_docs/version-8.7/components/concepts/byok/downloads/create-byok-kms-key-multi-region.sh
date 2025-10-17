# Assume your credentials
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_SESSION_TOKEN="your-session-token"  # if using temporary credentials

# Configuration - Update these values
YOUR_ACCOUNT_ID="<your-account-id>"

# Pre-configured alias name - change if needed
ALIAS_NAME="alias/camunda-byok-multi-region-key"

# Pre-configured values - DO NOT CHANGE THESE VALUES
TENANT_ROLE_ARN="<TENANT-ROLE-ARN>"
PRIMARY_REGION="<PRIMARY-REGION>"
SECONDARY_REGION="<SECONDARY-REGION>"

# Create KMS key policy file
cat > kms-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Enable IAM user permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<CUSTOMER-AWS-ACCOUNT-ID>:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "Allow Camunda tenant IAM Role basic key access",
      "Effect": "Allow",
      "Principal": {
        "AWS": "<TENANT-ROLE-ARN>"
      },
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:ReEncrypt*",
        "kms:DescribeKey",
        "kms:GenerateDataKey*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "Allow Camunda tenant IAM Role to create grants for provisioning encrypted EBS volumes",
      "Effect": "Allow",
      "Principal": {
        "AWS": "<TENANT-ROLE-ARN>"
      },
      "Action": [
        "kms:CreateGrant",
        "kms:ListGrants",
        "kms:RevokeGrant"
      ],
      "Resource": "*"
    }
  ]
}
EOF

# Create multi-region KMS key in primary region
echo "Creating multi-region KMS key in $PRIMARY_REGION..."
PRIMARY_KEY_ID=$(aws kms create-key \
  --region $PRIMARY_REGION \
  --description "Camunda 8 BYOK Multi-Region Key" \
  --key-usage ENCRYPT_DECRYPT \
  --key-spec SYMMETRIC_DEFAULT \
  --multi-region \
  --policy file://kms-policy.json \
  --query 'KeyMetadata.KeyId' \
  --output text)

# Create alias in primary region
aws kms create-alias \
  --region $PRIMARY_REGION \
  --alias-name $ALIAS_NAME \
  --target-key-id $PRIMARY_KEY_ID

# Wait for key to be fully available
for i in {1..30}; do
  KEY_STATE=$(aws kms describe-key \
    --region $PRIMARY_REGION \
    --key-id $PRIMARY_KEY_ID \
    --query 'KeyMetadata.KeyState' \
    --output text 2>/dev/null)

  if [ "$KEY_STATE" = "Enabled" ]; then
    break
  fi

  echo "Key state: $KEY_STATE, waiting... (attempt $i/30)"
  sleep 5
done

if [ "$KEY_STATE" != "Enabled" ]; then
  echo "Error: Key did not become available after 150 seconds"
  exit 1
fi

# Create replica key in secondary region
echo "Creating replica key in $SECONDARY_REGION..."
SECONDARY_KEY_ID=$(aws kms replicate-key \
  --key-id $PRIMARY_KEY_ID \
  --replica-region $SECONDARY_REGION \
  --description "Camunda 8 BYOK Multi-Region Key" \
  --policy file://kms-policy.json \
  --query 'ReplicaKeyMetadata.KeyId' \
  --output text)

# Wait for replica to be fully available
sleep 5

# Output both key ARNs
echo "\n=== KMS Key ARNs Created ==="
PRIMARY_ARN=$(aws kms describe-key \
  --region $PRIMARY_REGION \
  --key-id $PRIMARY_KEY_ID \
  --query 'KeyMetadata.Arn' \
  --output text)
echo "Primary Region ($PRIMARY_REGION): $PRIMARY_ARN"

SECONDARY_ARN=$(aws kms describe-key \
  --region $SECONDARY_REGION \
  --key-id $SECONDARY_KEY_ID \
  --query 'KeyMetadata.Arn' \
  --output text)
echo "Secondary Region ($SECONDARY_REGION): $SECONDARY_ARN"