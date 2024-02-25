package benefitCategory

import (
	"time"
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new benefitCategory
func (s *store) Create(db *gorm.DB, e *model.BenefitCategories) (err error) {
	return db.Create(e).Error
}

// Get list benefitCategory
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.BenefitCategories, error) {
	var benefitCategory []*model.BenefitCategories
	var totalRows int64

	db.Model(benefitCategory).Where(`benefit_categories.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("BenefitCategoryParent").
		Where(`benefit_categories.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("benefit_categories.created_at desc")

	return totalRows, benefitCategory, query.Find(&benefitCategory).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.BenefitCategories, error) {
	var benefitCategory *model.BenefitCategories

	query := db.Preload("BenefitCategoryParent").Where(`benefit_categories.id = ?`, id)

	return benefitCategory, query.First(&benefitCategory).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.BenefitCategories) error {
	var benefitCategory *model.BenefitCategories
	updateData.UpdatedAt = time.Now()
	query := db.Where(`benefit_categories.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&benefitCategory).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var benefitCategory *model.BenefitCategories

	query := db.Where(`benefit_categories.id = ?`, id)

	return query.Delete(&benefitCategory).Error
}
