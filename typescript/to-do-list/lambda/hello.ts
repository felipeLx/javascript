import { LambdaSubscription } from "@aws-cdk/aws-sns-subscriptions"

exports.handler = async function(event: any, context: any) {
    context.succeed(event.name)
}