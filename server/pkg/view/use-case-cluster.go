package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateUseCaseClusterResponse struct {
	Data *Plant `json:"data"`
}

type UseCaseCluster struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	ParentId    *model.UUID `json:"parentId"`
	Description string      `json:"description"`
	Active      *bool       `json:"active"`
	ParentName  string      `json:"parentName"`
	CreatedAt   string      `json:"createdAt"`
	UpdatedAt   string      `json:"updatedAt"`
}

func ToUseCaseCluster(useCaseCluster *model.UseCaseCluster) *UseCaseCluster {
	useCaseClusterParentName := ""
	if useCaseCluster.UseCaseClusterParent != nil {
		useCaseClusterParentName = useCaseCluster.UseCaseClusterParent.Name
	}
	return &UseCaseCluster{
		Id:          useCaseCluster.ID.String(),
		CreatedAt:   useCaseCluster.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:   useCaseCluster.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:        useCaseCluster.Name,
		Description: useCaseCluster.Description,
		ParentId:    useCaseCluster.ParentId,
		Active:      useCaseCluster.Active,
		ParentName:  useCaseClusterParentName,
	}
}

func ToUseCaseClusters(useCaseClusters []*model.UseCaseCluster) []UseCaseCluster {
	rs := make([]UseCaseCluster, 0, len(useCaseClusters))
	for _, useCaseCluster := range useCaseClusters {
		c := ToUseCaseCluster(useCaseCluster)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
