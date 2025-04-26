import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../guards/AuthenticationGuard';
import { AuthorizationGuard } from '../../guards/AuthorizationGuard';
import { ResponseDataInterceptor } from '../../interceptors/ResponseDataInterceptor';
import { LimitConverterPipe } from '../../lib/pipes/LimitConverterPipe';
import { PageConverterPipe } from '../../lib/pipes/PageConverterPipe';
import { CountryService } from './CountryService';
import { CreateCountryDto } from './dto/CreateCountryDto';
import { UpdateCountryDto } from './dto/UpdateCountryDto';
import { CountriesResponseDto } from './dto/response/CountriesResponseDto';
import { CountryResponseDto } from './dto/response/CountryResponseDto';

@ApiTags('Country Metadata management')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@UseInterceptors(ResponseDataInterceptor)
@Controller('/mm/country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOperation({ summary: 'Get a list of countries' })
  @ApiOkResponse({
    description: 'List of countries retrieved successfully',
    type: CountriesResponseDto,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'name', required: false })
  @Get('/')
  async getCountries(
    @Query('page', new PageConverterPipe()) page?: number,
    @Query('limit', new LimitConverterPipe()) limit?: number,
    @Query('name') name?: string,
  ) {
    return this.countryService.listCountries({
      page,
      limit,
      name,
    });
  }

  @ApiOperation({ summary: 'Get a country by ID' })
  @ApiOkResponse({
    description: 'Country retrieved successfully',
    type: CountryResponseDto,
  })
  @Get('/:id')
  getDetailCountry(@Param('id') id: string) {
    return this.countryService.getDetailCountry(id);
  }

  @ApiOperation({ summary: 'Create a new country' })
  @ApiOkResponse({
    description: 'Country created successfully',
    type: CountryResponseDto,
  })
  @Post('/')
  async createCountry(@Body() body: CreateCountryDto) {
    return this.countryService.createCountry(body);
  }

  @ApiOperation({ summary: 'Update a country' })
  @ApiOkResponse({
    description: 'Country updated successfully',
    type: CountryResponseDto,
  })
  @Patch('/:id')
  async updateCountry(@Param('id') id: string, @Body() body: UpdateCountryDto) {
    return this.countryService.updateCountry(id, body);
  }

  @ApiOperation({ summary: 'Delete a country' })
  @ApiOkResponse({
    description: 'Country deleted successfully',
    type: CountryResponseDto,
  })
  @Delete('/:id')
  async deleteCountry(@Param('id') id: string) {
    return this.countryService.deleteCountry(id);
  }
}