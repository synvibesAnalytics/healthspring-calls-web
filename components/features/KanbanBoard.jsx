"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useFetch from "@/hooks/use-fetch";
import { fetchAllLeads, updateLeadStatus } from "@/actions/leads";
import {
  Loader,
  User,
  Mail,
  Phone,
  Building2,
  Clock,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

// Status colors for top border
const statusColors = {
  IDENTIFIED_OPPORTUNITY: "border-blue-500",
  QUALIFIED_LEAD: "border-yellow-500",
  PROPOSAL_SUBMITTED: "border-purple-500",
  NEGOTIATION: "border-orange-500",
  CLOSURE: "border-green-500",
  LOST: "border-red-500",
};

// Default statuses
const initialLeads = {
  IDENTIFIED_OPPORTUNITY: [],
  QUALIFIED_LEAD: [],
  PROPOSAL_SUBMITTED: [],
  NEGOTIATION: [],
  CLOSURE: [],
  LOST: [],
};

const allStatuses = Object.keys(statusColors);

const KanbanBoard = () => {
  const {
    loading,
    error,
    data: leads,
    fn: fetchLeads,
  } = useFetch(fetchAllLeads);
  const [kanbanLeads, setKanbanLeads] = useState({});
  const [activeDrop, setActiveDrop] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState(allStatuses);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    if (leads) {
      const groupedLeads = leads.reduce((acc, lead) => {
        if (!acc[lead.status]) acc[lead.status] = [];
        acc[lead.status].push(lead);
        return acc;
      }, {});
      setKanbanLeads({ ...initialLeads, ...groupedLeads });
    }
  }, [leads]);

  const onDragEnd = async (result) => {
    setActiveDrop(null); // Reset highlight

    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const newLeads = { ...kanbanLeads };
    const [movedLead] = newLeads[sourceCol].splice(source.index, 1);
    movedLead.status = destCol;
    newLeads[destCol] = [...newLeads[destCol], movedLead];

    setKanbanLeads(newLeads);

    try {
      await updateLeadStatus(movedLead.id, destCol);
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  const onDragStart = () => setActiveDrop(null);
  const onDragUpdate = (update) => {
    if (update.destination) setActiveDrop(update.destination.droppableId);
  };

  const toggleStatusVisibility = (status, isChecked) => {
    setSelectedStatuses((prev) =>
      isChecked ? [...prev, status] : prev.filter((s) => s !== status)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error fetching leads.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen p-6 w-full">
      {/* Header Section with Fixed Column Selector */}
      <div className="container flex justify-start gap-4 items-center mb-4">
        <h1 className="text-xl font-semibold">Your Leads</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              Columns <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {allStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={(isChecked) =>
                  toggleStatusVisibility(status, isChecked)
                }
                className="capitalize"
              >
                {status.replace("_", " ")}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-y-hidden max-w-7xl">
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
        >
          <div className="flex gap-6 py-6 pr-6">
            {selectedStatuses.map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided, snapshot) => (
                  <Card
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "w-[295px] bg-gray-100 rounded-xl shadow-lg flex flex-col flex-shrink-0",
                      activeDrop === status &&
                        "border-2 border-dashed border-gray-500",
                      snapshot.isDraggingOver && "bg-gray-200"
                    )}
                  >
                    {/* Column Header */}
                    <CardHeader
                      className={cn("p-4 border-t-4", statusColors[status])}
                    >
                      <h2 className="text-lg font-semibold text-gray-700">
                        {status.replace("_", " ")}
                      </h2>
                    </CardHeader>

                    {/* Scrollable Leads Section */}
                    <CardContent className="p-4 space-y-4 flex-1">
                      {(kanbanLeads[status] || []).map((lead, index) => (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn(
                                "p-3 bg-white rounded-lg shadow-md cursor-grab transition-all",
                                snapshot.isDragging
                                  ? "scale-105 shadow-xl"
                                  : "hover:bg-gray-50"
                              )}
                            >
                              <CardHeader className="p-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-600" />
                                  {lead.name}
                                </CardTitle>
                                <CardDescription className="text-xs text-muted-foreground flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  {lead.email}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="p-2 text-xs text-gray-600 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-500" />
                                  {lead.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-indigo-500" />
                                  {lead.client.companyName}
                                </div>
                                {lead.assignedUser && (
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-500" />
                                    Assigned to: {lead.assignedUser.name}
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  Created{" "}
                                  {new Date(
                                    lead.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </CardContent>
                  </Card>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
