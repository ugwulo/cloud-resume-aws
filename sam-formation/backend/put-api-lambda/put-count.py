import boto3
import json

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = "resume-count-table"
table = dynamodb.Table(table_name)

# lambda visit count PUT handler
def lambda_handler(event, context):

    visit_count = 0
    user = "Resume App"

    # Get current visit count
    response = table.get_item(Key={'ID': user})
    if 'Item' in response:
        visit_count = response['Item']['count']

    visit_count += 1

    # Update the visit count in the table
    table.put_item(Item={'ID': user, 'count': visit_count})

    # set response body to count, more items could be added if necessary
    message = {'status': "successfully updated count"}

    # Prepare HTTP response
    http_resp = {
        'headers': {
            "Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*"
        },
        'statusCode': 200,
        'body': json.dumps(message)
    }

    return http_resp