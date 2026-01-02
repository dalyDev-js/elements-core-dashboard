export const RESOURCE_TYPES = {
  ENGINEER: "engineer",
  PURCHASE: "purchase",
  PC: "pc",
  EQUIPMENT: "equipment",
} as const;

export type ResourceType = (typeof RESOURCE_TYPES)[keyof typeof RESOURCE_TYPES];

export interface BaseResource {
  id: string;
  type: ResourceType;
  createdAt: Date;
}

export interface Engineer extends BaseResource {
  id: string;
  type: "engineer";
  name: string;
  email: string;
  salary?: string;
  phone?: string;
}

export interface Purchase extends BaseResource {
  type: "purchase";
  name: string;
  description?: string;
  cost: number;
  vendor?: string;
}

export interface PC extends BaseResource {
  type: "pc";
  name: string;
  model?: string;
  serialNumber?: string;
  specifications?: string;
}

export interface Equipment extends BaseResource {
  type: "equipment";
  name: string;
  description?: string;
  quantity: number;
}

export type Resource = Engineer | Purchase | PC | Equipment;

// Helper type for resource assignment
export interface ResourceAssignment {
  resourceType: ResourceType;
  resourceId: string;
  assignedAt: Date;
}
