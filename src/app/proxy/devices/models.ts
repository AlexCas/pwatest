
export interface CreateUpdateDeviceDto {
  id?: string;
  ipAddress: string;
  comment?: string;
  factoryId: string;
  warehouseId: string;
  isActive: boolean;
}

export interface DeviceDto {
  id?: string;
  bId: number;
  sId?: string;
  name?: string;
  ipAddress?: string;
  comment?: string;
  factoryId?: string;
  factoryName?: string;
  warehouseId?: string;
  warehouseName?: string;
  isActive: boolean;
}

export interface DeviceRequestDto {
  name?: string;
  factoryId?: string;
  warehouseId?: string;
  isActive?: boolean;
}

export interface UpdateDeviceStatusDto {
  id: string;
  isActive: boolean;
}
