package bundle

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new bundle
func (s *store) Create(db *gorm.DB, e *model.Bundles) (err error) {
	return db.Create(e).Error
}

// Get list bundle
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.Bundles, error) {
	var bundle []*model.Bundles
	var totalRows int64

	db.Model(bundle).Where(`bundles.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("UseCases.UseCase").
	Where(`bundles.name like ?`, "%"+name+"%").
	Offset(limit * (page - 1)).
	Limit(limit).
	Order("bundles.created_at desc")

	return totalRows, bundle, query.Find(&bundle).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.Bundles, error) {
	var bundle *model.Bundles

	query := db.Preload("UseCases.UseCase").
	Where(`bundles.id = ?`, id)

	return bundle, query.First(&bundle).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.Bundles) error {
	var bundle *model.Bundles
	var UseCases *model.BundlesToUseCases
	
	updateData.UpdatedAt = time.Now()
	query := db.Where(`bundles.id = ?`, id).
	Omit("UseCases").
	UpdateColumns(updateData)

	db.Model(&UseCases).Where(`bundles_id = ?`, id).Delete(&UseCases)
	
	db.Model(&UseCases).Create(updateData.UseCases)
 

	return query.UpdateColumns(&bundle).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var bundle *model.Bundles

	query := db.Where(`bundles.id = ?`, id)

	return query.Delete(&bundle).Error
}
