import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2"
import * as lambda from "aws-cdk-lib/aws-lambda"

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

        const handler = new lambda.Function(this, "Lambda", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("resources"),
            handler: "index.hello_world",
            vpc,
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_ISOLATED,
            },
        })
    }
}