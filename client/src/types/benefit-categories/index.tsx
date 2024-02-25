export interface BenefitCategory {
  id: string
  name: string
  parentId: string
  parentName: string
  description: string
  active: boolean | string
}

export type BenefitCategories = {total: number,data:BenefitCategory[]}

export type BenefitCategoryDetail = {data:BenefitCategory}
