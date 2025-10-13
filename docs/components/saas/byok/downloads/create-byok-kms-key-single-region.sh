# Assume your credentials
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_SESSION_TOKEN="your-session-token"  # if using temporary credentials

# Configuration - Update these values
TENANT_ROLE_ARN="<your-camunda-tenant-iam-role-arn>"
YOUR_ACCOUNT_ID="<your-account-id>"

# Pre-configured alias name - change if needed
ALIAS_NAME="alias/camunda-byok-multi-region-key"

# Pre-configured primary nd secondary regions - DO NOT CHANGE THESE VALUES
PRIMARY_REGION="eu-west-1"
SECONDARY_REGION="eu-west-2"

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
 83 changes: 83 additions & 0 deletions83  
docs/components/saas/byok/downloads/create-byok-kms-key-single-region.sh
Viewed
Original file line number	Diff line number	Diff line change
@@ -0,0 +1,83 @@
# Assume your credentials - Update these values
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_SESSION_TOKEN="your-session-token"  # if using temporary credentials

# Configuration - Update these values
TENANT_ROLE_ARN="<your-camunda-tenant-iam-role-arn>"
YOUR_ACCOUNT_ID="<your-account-id>"

# Pre-configured alias name - change if needed
ALIAS_NAME="alias/camunda-byok-key"

# Pre-configured region - DO NOT CHANGE THIS VALUE
REGION="eu-west-1"

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

# Create KMS key
KEY_ID=$(aws kms create-key \
  --region $REGION \
  --description "Camunda 8 BYOK Key" \
  --key-usage ENCRYPT_DECRYPT \
  --key-spec SYMMETRIC_DEFAULT \
  --policy file://kms-policy.json \
  --query 'KeyMetadata.KeyId' \
  --output text)

# Create alias for easier management
aws kms create-alias \
  --region $REGION \
  --alias-name $ALIAS_NAME \
  --target-key-id $KEY_ID

# Get the key ARN
aws kms describe-key \
  --region $REGION \
  --key-id $KEY_ID \
  --query 'KeyMetadata.Arn' \
  --output text