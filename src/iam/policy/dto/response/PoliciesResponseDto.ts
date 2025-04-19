import { ApiProperty } from '@nestjs/swagger';
import { PolicyDto } from './PolicyDto';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';

class PoliciesData {
  @ApiProperty({
    description: 'Total number of policies matching the criteria',
    example: 42,
  })
  total: number;

  @ApiProperty({
    type: [PolicyDto],
    description: 'List of policies for the current page',
  })
  items: PolicyDto[];
}

export class PoliciesResponseDto extends ApiDocumentResponse {
  @ApiProperty({ type: PoliciesData })
  data: PoliciesData;
}
