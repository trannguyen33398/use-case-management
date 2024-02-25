package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateRiskResponse struct {
	Data *Risk `json:"data"`
}

type Risk struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	ParentId    *model.UUID `json:"parentId"`
	Priority    int         `json:"priority"`
	Description string      `json:"description"`
	Status      string      `json:"status"`
	Active      *bool       `json:"active"`
	ParentName  string      `json:"parentName"`
	CreatedAt   string      `json:"createdAt"`
	UpdatedAt   string      `json:"updatedAt"`
}

func ToRisk(risk *model.Risks) *Risk {
	riskParentName := ""
	if risk.RiskParent != nil {
		riskParentName = risk.RiskParent.Name
	}
	return &Risk{
		Id:          risk.ID.String(),
		CreatedAt:   risk.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:   risk.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:        risk.Name,
		Description: risk.Description,
		ParentId:    risk.ParentId,
		Active:      risk.Active,
		Priority:    risk.Priority,
		ParentName:  riskParentName,
	}
}

func ToRisks(risks []*model.Risks) []Risk {
	rs := make([]Risk, 0, len(risks))
	for _, risk := range risks {
		c := ToRisk(risk)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
