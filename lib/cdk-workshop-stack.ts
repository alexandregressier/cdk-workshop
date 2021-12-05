import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2"

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
    }
}