import boto3
import json

# lambda visit count API
def lambda_handler(event, context):

    visit_count = 0
    user = "Resume App"

    # Create DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table_name = "resume-count-table"
    table = dynamodb.Table(table_name)

    # Get current visit count
    response = table.get_item(Key={'ID': user})
    if 'Item' in response:
        visit_count = response['Item']['count']

    # set response body to count, more items could be added if necessary
    count = {'count': f"{visit_count}"}

    # Prepare HTTP responses
    http_resp = {
        'headers': {
            "Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
        },
        'statusCode': 200,
        'body': json.dumps(count)
    }

    return http_resp