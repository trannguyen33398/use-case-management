package benefit

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new benefit
func (s *store) Create(db *gorm.DB, e *model.Benefits) (err error) {
	return db.Create(e).Error
}

// Get list benefit
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Benefits, error) {
	var benefit []*model.Benefits
	var totalRows int64

	db.Model(benefit).Where(`benefits.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("BenefitParent").
	Preload("UseCases.UseCase").
	Preload("BenefitCategories.BenefitCategory").
	Where(`benefits.name like ?`, "%"+name+"%").
	Offset(limit * (page - 1)).
	Limit(limit).
	Order("benefits.created_at desc")

	return totalRows, benefit, query.Find(&benefit).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Benefits, error) {
	var benefit *model.Benefits

	query := db.Preload("BenefitParent").
	Preload("UseCases.UseCase").
	Preload("BenefitCategories.BenefitCategory").
	Where(`benefits.id = ?`, id)

	return benefit, query.First(&benefit).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.Benefits) error {
	var benefit *model.Benefits
	var UseCases *model.BenefitsToUseCases
	var BenefitCategories *model.BenefitsToBenefitCategories
	updateData.UpdatedAt = time.Now()
	query := db.Where(`benefits.id = ?`, id).
	Omit("UseCases","BenefitCategories").
	UpdateColumns(updateData)

	db.Model(&UseCases).Where(`benefits_id = ?`, id).Delete(&UseCases)
	db.Model(&BenefitCategories).Where(`benefits_id = ?`, id).Delete(&BenefitCategories)

	db.Model(&UseCases).Create(updateData.UseCases)
	db.Model(&BenefitCategories).Create(updateData.BenefitCategories)

	return query.UpdateColumns(&benefit).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var benefit *model.Benefits

	query := db.Where(`benefits.id = ?`, id)

	return query.Delete(&benefit).Error
}
