import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { ItemDto, ItemOeeDto, MachineItem } from '../models';

export interface CreateQualityAlertDto {
  file: IFormFile;
  factoryId: string;
  warehouseId: string;
  startDate: string;
  endDate: string;
  alertTypeId: number;
}

export interface DeadTimeRequestDto extends ReportRequest {
  machines?: string;
}

export interface ItemProd3Dto {
  factory?: string;
  warehouse?: string;
  productions: TvPlanProduction3Dto[];
}

export interface ItemProdDto {
  name?: string;
  machines: TvPlanProductionItemDto[];
  semanales: TvPlanProduction3Dto[];
}

export interface ItemScrapDto {
  name?: string;
  items: TvScrapItemDto[];
  moldeRazonItems: ScrapItemDto[];
}

export interface ItemSupplyDto<T> {
  name?: string;
  totalRequested: number;
  totalSupplied: number;
  totalPending: number;
  items: T[];
}

export interface OeeDto extends TvOeeDto {
  oees: OeeItemDto[];
}

export interface OeeItemDto {
  factory?: string;
  warehouse?: string;
  totalDeadTime: number;
  totalRealRunningTime: number;
  totalTimeWorked: number;
  deadTime: number;
  availability: number;
  efficiency: number;
  quality: number;
  oee: number;
  date?: string;
  hour?: string;
}

export interface PendingSupplyDto {
  factory?: string;
  warehouse?: string;
  folio?: string;
  order?: string;
  itemNumFather?: string;
  itemNumFatherDescr?: string;
  machine?: string;
  itemNumComp?: string;
  itemNumCompDescr?: string;
  totalRequested: number;
  totalSupplied: number;
  totalPending: number;
  colorId: number;
}

export interface PendingSupplyRequestDto {
  factoryId?: string;
  warehouseId?: string;
  startDate?: string;
  endDate?: string;
  machines: MachineItem[];
  folios: string[];
  orders: string[];
  itemsF: string[];
  itemsC: string[];
}

export interface PlanProdRequestDto {
  factoryId?: string;
  warehouseId?: string;
  startDate?: string;
  endDate?: string;
  machines: MachineItem[];
  orders: string[];
  items: string[];
}

export interface QaRequestDto extends ReportRequest {
  alertTypes: number[];
}

export interface QualityAlertDto {
  factory?: string;
  warehouse?: string;
  startDate?: string;
  endDate?: string;
  fileRoot?: string;
  fileName?: string;
  alertTypeId: number;
  alertType?: string;
}

export interface ReportRequest {
  factoryId?: string;
  warehouseId?: string;
  startDate?: string;
  endDate?: string;
}

export interface ScrapItemDto {
  machine?: string;
  mold?: string;
  reasonCode?: string;
  articleNumber: number;
  scrapPercentage: number;
  scrapCost: number;
}

export interface ScrapRequestDto extends ReportRequest {
  machines?: string;
}

export interface TvDeadTimeDto {
  factory?: string;
  trcItems: TvDeadTimeItemDto[];
  items: TvDeadTimeItemDto[];
  warehouse: ItemDto<TvDeadTimeItemDto>;
}

export interface TvDeadTimeItemDto {
  machine?: string;
  percentage: number;
  deadTime: number;
  reason?: string;
  realRunningTime: number;
  date?: string;
}

export interface TvOeeDto {
  factory?: string;
  warehouse: TvOeeItemDto;
  general: ItemOeeDto<TvOeeItemDto>;
}

export interface TvOeeItemDto {
  warehouse?: string;
  availability: number;
  availabilityColorId: number;
  availabilityColorName?: string;
  efficiency: number;
  efficiencyColorId: number;
  efficiencyColorName?: string;
  quality: number;
  qualityColorId: number;
  qualityColorName?: string;
  oee: number;
  oeeColorId: number;
  oeeColorName?: string;
}

export interface TvPendingSupplyDto {
  factory?: string;
  totalRequested: number;
  totalSupplied: number;
  totalPending: number;
  warehouses: ItemSupplyDto<TvPendingSupplyItemDto>;
  pendingSupplies: PendingSupplyDto[];
}

export interface TvPendingSupplyItemDto {
  machine?: string;
  voucher?: string;
  colorId: number;
  colorName?: string;
  percentage: number;
  date?: string;
  hour?: string;
}

export interface TvPlanProduction3Dto {
  day?: string;
  orderedQuantity: number;
  quantityCompleted: number;
  percentage: number;
  colorId: number;
  colorName?: string;
}

export interface TvPlanProductionDto {
  factory?: string;
  warehouse: ItemProdDto;
}

export interface TvPlanProductionItemDto {
  machine?: string;
  orderedQuantity: number;
  quantityCompleted: number;
  amountToBeCompleted: number;
  percentage: number;
  difference: number;
  colorId: number;
  colorName?: string;
  orders: TvPlanProductionTv1Dto[];
}

export interface TvPlanProductionTv1Dto {
  machine?: string;
  startDate?: string;
  order?: string;
  articleNumber?: string;
  description?: string;
  orderedQuantity: number;
  quantityCompleted: number;
  percentage: number;
  orderColorId: number;
  orderColorName?: string;
  amountToBeCompleted: number;
  timeRemainingToCompleteOrder: number;
  timeRemainingToCompletePieces: number;
  moldStatus?: string;
  colorByMoldChangeId: number;
  colorByMoldChangeName?: string;
  date?: string;
  hour?: string;
}

export interface TvScrapDto {
  factory?: string;
  machines: TvScrapGnlItemDto[];
  warehouse: ItemScrapDto;
}

export interface TvScrapGnlItemDto {
  warehouse?: string;
  machine?: string;
  scrapQuantity: number;
  scrapCost: number;
  gnlCostPercentage: number;
  completedQuantity: number;
  gnlScrapPercentage: number;
  scrapCostPercentage: number;
  colorId: number;
  colorName?: string;
}

export interface TvScrapItemDto {
  machine?: string;
  scrapCost: number;
  scrapQuantity: number;
  gnlCostPercentage: number;
  scrapCostPercentage: number;
  completedQuantity: number;
  gnlScrapPercentage: number;
  colorId: number;
  colorName?: string;
  isInTop: boolean;
}
