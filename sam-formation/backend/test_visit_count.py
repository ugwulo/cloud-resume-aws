import visit_count
import os

# visit count local test
if __name__ == "__main__":
    event = {'queryStringParameters': {}}
    os.environ['TABLE_NAME'] = 'visit-count-table'
    print(visit_count.lambda_handler(event, None))