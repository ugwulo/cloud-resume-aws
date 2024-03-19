import boto3
import os
import json

# lambda visit count API
def lambda_handler(event, context):
    # Extract user from query string parameters, defaulting to "app" user if not provided
    query_params = event.get('queryStringParameters')
    user = query_params.get('user', 'app') if query_params else 'app'
    if not user:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'User not provided in query parameters'})
        }

    visit_count = 0

    # Create DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table_name = os.environ['TABLE_NAME']
    table = dynamodb.Table(table_name)

    # Get current visit count
    response = table.get_item(Key={'user': user})
    if 'Item' in response:
        visit_count = response['Item']['count']

    visit_count += 1

    # Update the visit count in the table
    table.put_item(Item={'user': user, 'count': visit_count})

    # set response body to count, more items could be added if necessary
    count = f"{visit_count}"

    # Prepare HTTP response
    http_resp = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://ugwulo.codes', # allow domain specific access
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500', # allow CORS for local testing
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
            },
        'body': json.dumps({'count': count})
    }

    return http_resp