package useCaseCluster

import (
	"time"

	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
	"gorm.io/gorm"
)

type store struct{}

func New() IStore {
	return &store{}
}

// Create new useCaseCluster
func (s *store) Create(db *gorm.DB, e *model.UseCaseCluster) (err error) {
	return db.Create(e).Error
}

// Get list useCaseCluster
func (s *store) All(db *gorm.DB, name string, page int, limit int) (int64, []*model.UseCaseCluster, error) {
	var useCaseCluster []*model.UseCaseCluster
	var totalRows int64

	db.Model(useCaseCluster).Where(`use_case_cluster.name like ?`, "%"+name+"%").Count(&totalRows)

	query := db.Preload("UseCaseClusterParent").
		Where(`use_case_cluster.name like ?`, "%"+name+"%").Offset(limit * (page - 1)).Limit(limit).Order("use_case_cluster.created_at desc")

	return totalRows, useCaseCluster, query.Find(&useCaseCluster).Error
}

func (s *store) Detail(db *gorm.DB, id string) (*model.UseCaseCluster, error) {
	var useCaseCluster *model.UseCaseCluster

	query := db.Preload("UseCaseClusterParent").Where(`use_case_cluster.id = ?`, id)

	return useCaseCluster, query.First(&useCaseCluster).Error
}

func (s *store) Update(db *gorm.DB, id string, updateData *model.UseCaseCluster) error {
	var useCaseCluster *model.UseCaseCluster

	updateData.UpdatedAt = time.Now()
	query := db.Where(`use_case_cluster.id = ?`, id).UpdateColumns(updateData)

	return query.UpdateColumns(&useCaseCluster).Error
}

func (s *store) Delete(db *gorm.DB, id string) error {
	var useCaseCluster *model.UseCaseCluster

	query := db.Where(`use_case_cluster.id = ?`, id)

	return query.Delete(&useCaseCluster).Error
}
