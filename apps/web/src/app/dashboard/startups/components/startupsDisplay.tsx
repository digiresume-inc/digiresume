'use client';
import { Button } from '@lf/ui/components/base/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@lf/ui/components/base/dialog';
import { Startup } from '@lf/utils';
import { GripVertical, Plus } from 'lucide-react';
import React, { useState } from 'react';
import StartupForm from './startupForm';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ToastError, ToastSuccess } from '@/components/toast';
import { createClient } from '@/supabase/client';

const StartupsDisplay = ({ startups }: { startups: any }) => {
  const supabase = createClient();
  const [localStartups, setLocalStartups] = useState<Startup[]>(startups);
  const [startupDraggingItemId, setStartupDraggingItemId] = useState<string | null>(null);
  const emptyStartup: Startup = {
    index: startups.length + 1,
    name: '',
    description: '',
    url: '',
    revenue: 0,
    status: 'active',
    show_status: false,
    category: 'other',
    verified: false,
    show_on_profile: false,
  };
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('Edit');
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);

  const StartupsDragStart = (start: any) => {
    setStartupDraggingItemId(start.draggableId); // Set the ID of the currently dragged item
  };

  const StartupsDragEnd = async (result: any) => {
    setStartupDraggingItemId(null);

    if (!result.destination) return;

    const reorderedStartups = Array.from(localStartups);
    const [reorderedStartup] = reorderedStartups.splice(result.source.index, 1);
    reorderedStartups.splice(result.destination.index, 0, reorderedStartup as Startup);
    try {
      setLocalStartups(reorderedStartups as Startup[]);
      await Promise.all(
        reorderedStartups.map(async (startup, index) => {
          if (startup.index !== index + 1) {
            const { error } = await supabase
              .from('startups')
              .update({ index: index + 1 })
              .eq('id', startup.id);

            if (error) {
              ToastError({ message: 'An unexpected error occurred.' });
            }
          }
        })
      );

      ToastSuccess({ message: 'Order updated' });
    } catch (error) {
      ToastError({ message: 'An unexpected error occurred.' });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3">
        <DragDropContext onDragStart={StartupsDragStart} onDragEnd={StartupsDragEnd}>
          <Droppable droppableId="startup-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full flex flex-col"
              >
                {/* Render draggable items here */}
                {localStartups.map((startup: Startup, index: number) => (
                  <Draggable key={startup.id} draggableId={startup.id!} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`transition-colors duration-300 border rounded-md mb-3 ${
                          startupDraggingItemId === startup.id
                            ? 'border-primary/70 border-dashed opacity-100'
                            : startupDraggingItemId
                              ? 'opacity-50 border border-dashed border-primary/40'
                              : 'opacity-100 border border-primary/40'
                        }`}
                      >
                        <div key={index} className="bg-card w-full min-h-36 rounded-lg p-4">
                          <div className="flex items-center justify-center w-full">
                            <div className="w-[5%] h-full">
                              {' '}
                              <GripVertical strokeWidth={1.2} />
                            </div>
                            <div className="flex flex-col items-center justify-center w-[95%] gap-2">
                              <div className="flex items-center justify-center w-full gap-2">
                                <div
                                  onClick={() => {
                                    setActionType('Edit');
                                    setSelectedStartup(startup);
                                    setOpen(true);
                                  }}
                                  className="w-12 h-12 flex items-center justify-center"
                                >
                                  <img
                                    src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.url}`}
                                    className="w-12 h-12 rounded-full"
                                  />
                                </div>
                                <div className="h-12 w-[calc(100%-64px)] flex flex-col gap-2 items-center justify-center">
                                  <div className="h-6 w-full bg-secondary rounded-lg" />
                                  <div className="flex gap-2 h-6 items-center justify-center w-full">
                                    <div className="h-full w-1/2 bg-secondary rounded-lg" />
                                    <div className="h-full w-1/2 bg-secondary rounded-lg" />
                                  </div>
                                </div>
                              </div>
                              <div className="h-16 w-full bg-secondary rounded-lg"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          onClick={() => {
            setActionType('Add');
            setSelectedStartup(emptyStartup);
            setOpen(true);
          }}
          variant={'outline'}
          className="w-full"
        >
          <Plus /> Add New
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto scrollbar-hidden no_scrollbar">
          <DialogHeader className="mb-4">
            <DialogTitle>{actionType} Startup</DialogTitle>
          </DialogHeader>
          <StartupForm startup={selectedStartup} actionType={actionType} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StartupsDisplay;
