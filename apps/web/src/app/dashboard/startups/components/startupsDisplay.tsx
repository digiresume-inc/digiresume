'use client';
import { Button } from '@dr/ui/components/base/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@dr/ui/components/base/dialog';
import { Startup, categoryOptions, statusOptions } from '@dr/schemas';
import { Edit, GripVertical, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react';
import StartupForm from './startupForm';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ToastError, ToastSuccess } from '@/components/general/toast';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';

const StartupsDisplay = ({ startups }: { startups: any }) => {
  const supabase = createClient();
  const [startupDraggingItemId, setStartupDraggingItemId] = useState<string | null>(null);
  const emptyStartup: Startup = {
    id: '',
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
  const router = useRouter();

  const StartupsDragStart = (start: any) => {
    setStartupDraggingItemId(start.draggableId); // Set the ID of the currently dragged item
  };

  const StartupsDragEnd = async (result: any) => {
    setStartupDraggingItemId(null);

    if (!result.destination) return;

    const reorderedStartups = Array.from(startups as Startup[]);
    const [reorderedStartup] = reorderedStartups.splice(result.source.index, 1);
    reorderedStartups.splice(result.destination.index, 0, reorderedStartup as Startup);
    try {
      await Promise.all(
        reorderedStartups.map(async (startup: Startup, index: number) => {
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
      router.refresh();
    } catch (error) {
      ToastError({ message: 'An unexpected error occurred.' });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 relative">
        <Button
          onClick={() => {
            setActionType('Add');
            setSelectedStartup(emptyStartup);
            setOpen(true);
          }}
          variant={'default'}
          className="w-full sticky top-0 left-0"
        >
          <Plus /> Add New
        </Button>
        <DragDropContext onDragStart={StartupsDragStart} onDragEnd={StartupsDragEnd}>
          <Droppable droppableId="startup-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full flex flex-col"
              >
                {/* Render draggable items here */}
                {startups.map((startup: Startup, index: number) => (
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
                        <div key={index} className="bg-card w-full min-h-36 rounded-lg p-2 lg:p-4">
                          <div className="flex items-center justify-center w-full gap-2">
                            <div className="w-[5%] h-full">
                              {' '}
                              <GripVertical className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={1.2} />
                            </div>
                            <div className="flex flex-col items-center justify-center w-[95%] gap-2">
                              <div className="flex items-center justify-center w-full gap-2">
                                <div className="w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center">
                                  <img
                                    src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.url}`}
                                    className="w-8 lg:w-12 h-8 lg:h-12 rounded-full"
                                  />
                                </div>
                                <div className="w-[calc(100%-64px)] flex flex-col items-center justify-center gap-1">
                                  <div className="w-full flex items-center justify-between">
                                    <p className="font-semibold text-sm lg:text-base">
                                      {startup.name}
                                    </p>
                                    <div className="flex items-center justify-center gap-2">
                                      <Button
                                        onClick={() => {
                                          setActionType('Edit');
                                          setSelectedStartup(startup);
                                          setOpen(true);
                                        }}
                                        size={'icon'}
                                        variant={'outline'}
                                      >
                                        <Edit />
                                      </Button>
                                      <Button size={'icon'} variant={'destructive'}>
                                        <Trash />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 items-center justify-start w-full">
                                    {(() => {
                                      const currentStatus = statusOptions.find(
                                        (s) => s.status === startup.status
                                      );
                                      return currentStatus ? (
                                        <span
                                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-tiny lg:text-xs font-medium bg-secondary`}
                                        >
                                          <span>{currentStatus.icon}</span>
                                          <span>{currentStatus.text}</span>
                                        </span>
                                      ) : (
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-tiny lg:text-xs font-medium bg-secondary">
                                          {startup.status}
                                        </span>
                                      );
                                    })()}
                                    {(() => {
                                      const currentCategory = categoryOptions.find(
                                        (s) => s.category === startup.category
                                      );
                                      return currentCategory ? (
                                        <span
                                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-tiny lg:text-xs font-medium bg-secondary`}
                                        >
                                          <span>{currentCategory.icon}</span>
                                          <span>{currentCategory.text}</span>
                                        </span>
                                      ) : (
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-tiny lg:text-xs font-medium bg-secondary">
                                          {startup.category}
                                        </span>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>
                              <div className="h-16 w-full bg-secondary text-sm p-3 rounded-md">
                                <p className="line-clamp-2">{startup.description}</p>
                              </div>
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
