package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreatePlantResponse struct {
	Data *Plant `json:"data"`
}

type Plant struct {
	Id                string      `json:"id"`
	Name              string      `json:"name"`
	ParentId          *model.UUID `json:"parentId"`
	OperationsCluster string      `json:"operationsCluster"`
	Type              string      `json:"type"`
	NameAbbreviation  string      `json:"nameAbbreviation"`
	Segment           []string    `json:"segment"`
	Zebra             *bool       `json:"zebra"`
	Active            *bool       `json:"active"`
	ParentName        string      `json:"parentName"`
	CreatedAt         string      `json:"createdAt"`
	UpdatedAt         string      `json:"updatedAt"`
}

func ToPlant(plant *model.Plants) *Plant {
	plantParentName := ""
	if plant.PlantParent != nil {
		plantParentName = plant.PlantParent.Name
	}
	return &Plant{
		Id:                plant.ID.String(),
		CreatedAt:         plant.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:         plant.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:              plant.Name,
		OperationsCluster: plant.OperationsCluster,
		ParentId:          plant.ParentId,
		Type:              plant.Type,
		Active:            plant.Active,
		NameAbbreviation:  plant.NameAbbreviation,
		Segment:           plant.Segment,
		Zebra:             plant.Zebra,
		ParentName:        plantParentName,
	}
}

func ToPlants(plants []*model.Plants) []Plant {
	rs := make([]Plant, 0, len(plants))
	for _, plant := range plants {
		c := ToPlant(plant)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
