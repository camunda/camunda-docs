# Assume your credentials - Update these values
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_SESSION_TOKEN="your-session-token"  # if using temporary credentials

# Configuration - Update these values
YOUR_ACCOUNT_ID="<your-account-id>"

# Pre-configured alias name - change if needed
ALIAS_NAME="alias/camunda-byok-key"

# Pre-configured values - DO NOT CHANGE THESE VALUES
TENANT_ROLE_ARN="<TENANT-ROLE-ARN>"
REGION="<PRIMARY-REGION>"

# Create KMS key policy file
cat > kms-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Enable IAM user permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::$YOUR_ACCOUNT_ID:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "Allow Camunda tenant IAM Role basic key access",
      "Effect": "Allow",
      "Principal": {
        "AWS": "$TENANT_ROLE_ARN"
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
        "AWS": "$TENANT_ROLE_ARN"
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