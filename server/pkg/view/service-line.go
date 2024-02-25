package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateServiceLineResponse struct {
	Data *ServiceLine `json:"data"`
}

type ServiceLine struct {
	Id                string      `json:"id"`
	Name              string      `json:"name"`
	ParentId          *model.UUID `json:"parentId"`
	Description       string      `json:"description"`
	ResponsiblePerson string      `json:"responsiblePerson"`
	Active            *bool       `json:"active"`
	ParentName        string      `json:"parentName"`
	CreatedAt         string      `json:"createdAt"`
	UpdatedAt         string      `json:"updatedAt"`
}

func ToServiceLine(serviceLine *model.ServiceLines) *ServiceLine {
	serviceLineParentName := ""
	if serviceLine.ServiceLineParent != nil {
		serviceLineParentName = serviceLine.ServiceLineParent.Name
	}

	return &ServiceLine{
		Id:                serviceLine.ID.String(),
		CreatedAt:         serviceLine.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:         serviceLine.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:              serviceLine.Name,
		Description:       serviceLine.Description,
		ParentId:          serviceLine.ParentId,
		ResponsiblePerson: serviceLine.ResponsiblePerson,
		Active:            serviceLine.Active,
		ParentName:        serviceLineParentName,
	}
}

func ToServiceLines(serviceLines []*model.ServiceLines) []ServiceLine {
	rs := make([]ServiceLine, 0, len(serviceLines))
	for _, serviceLine := range serviceLines {
		c := ToServiceLine(serviceLine)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
