import { ApiProperty } from '@nestjs/swagger';
import { PolicyDto } from './PolicyDto';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class Action {
  @ApiProperty({
    description: 'The unique identifier of the action',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the action',
    example: 'ReadUserProfile',
  })
  name: string;
}

class PolicyDetailData extends PolicyDto {
  @ApiProperty({
    type: [Action],
    description: 'The actions associated with the policy',
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'ReadUserProfile',
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: 'ViewDashboard',
      },
    ],
  })
  actions: Action[];
}

export class PolicyDetailResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: PolicyDetailData,
  })
  data: PolicyDetailData;
}
