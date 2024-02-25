package view

import (
	"github.com/jakobgabriel/use-case-management-app/server/pkg/model"
)

type CreateSystemResponse struct {
	Data *System `json:"data"`
}

type System struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	ParentId    *model.UUID `json:"parentId"`
	Category    string      `json:"category"`
	Description string      `json:"description"`
	ToolName    string      `json:"toolName"`
	Active      *bool       `json:"active"`
	ParentName  string      `json:"parentName"`
	CreatedAt   string      `json:"createdAt"`
	UpdatedAt   string      `json:"updatedAt"`
}

func ToSystem(system *model.Systems) *System {
	systemParentName := ""

	if system.SystemParent != nil {
		systemParentName = system.SystemParent.Name
	}
	return &System{
		Id:          system.ID.String(),
		CreatedAt:   system.CreatedAt.Format("02-Jan-2006 15:04:05"),
		UpdatedAt:   system.UpdatedAt.Format("02-Jan-2006 15:04:05"),
		Name:        system.Name,
		Description: system.Description,
		ParentId:    system.ParentId,
		Active:      system.Active,
		Category:    system.Category,
		ToolName:    system.ToolName,
		ParentName:  systemParentName,
	}
}

func ToSystems(systems []*model.Systems) []System {
	rs := make([]System, 0, len(systems))
	for _, system := range systems {
		c := ToSystem(system)
		if c != nil {
			rs = append(rs, *c)
		}
	}

	return rs
}
