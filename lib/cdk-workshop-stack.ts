import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2"
import { Function, Code, Runtime } from "aws-cdk-lib/aws-lambda"
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway"

export class CdkWorkshopStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const vpc = new Vpc(this, "VPC", {
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: "Ingress",
                    subnetType: SubnetType.PRIVATE_ISOLATED,
                },
            ],
        })

        const handler = new Function(this, "Lambda", {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset("resources"),
            handler: "index.hello_world",
            vpc,
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_ISOLATED,
            },
        })

        const api = new LambdaRestApi(this, "API", {
            handler,
        })
    }
}