"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SlideRow = {
  id: number;
  title: string;
  image: string;
  order: number;
  isActive: boolean;
};

type SlideFormValues = {
  title: string;
  image: string;
  order: string;
  isActive: boolean;
};

const initialSlides: SlideRow[] = [
  {
    id: 1,
    title: "Premium Garage Equipment",
    image: "/images/slides/Slide-1.jpeg",
    order: 1,
    isActive: true,
  },
  {
    id: 2,
    title: "Tailored solutions for Bangladesh",
    image: "/images/slides/Slide-2.png",
    order: 2,
    isActive: true,
  },
  {
    id: 3,
    title: "Trusted Tools from Global Brands",
    image: "/images/slides/Slide-3.jpg",
    order: 3,
    isActive: true,
  },
];

function sortSlides(slides: SlideRow[]) {
  return [...slides].sort((left, right) => {
    if (left.order === right.order) {
      return left.id - right.id;
    }

    return left.order - right.order;
  });
}

function createEmptyFormValues(nextOrder: number): SlideFormValues {
  return {
    title: "",
    image: "",
    order: String(nextOrder),
    isActive: true,
  };
}

export default function AdminSlidesPage() {
  const [slides, setSlides] = useState(() => sortSlides(initialSlides));
  const [editingSlide, setEditingSlide] = useState<SlideRow | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<SlideFormValues>(() =>
    createEmptyFormValues(initialSlides.length + 1)
  );

  const nextSlideId = useMemo(
    () => slides.reduce((maxId, slide) => Math.max(maxId, slide.id), 0) + 1,
    [slides]
  );

  function openCreateDialog() {
    setEditingSlide(null);
    setFormValues(createEmptyFormValues(slides.length + 1));
    setIsFormOpen(true);
  }

  function openEditDialog(slide: SlideRow) {
    setEditingSlide(slide);
    setFormValues({
      title: slide.title,
      image: slide.image,
      order: String(slide.order),
      isActive: slide.isActive,
    });
    setIsFormOpen(true);
  }

  function handleDeleteSlide(id: number) {
    const slide = slides.find((currentSlide) => currentSlide.id === id);

    if (!slide) {
      return;
    }

    const confirmed = window.confirm(`Delete "${slide.title}"?`);

    if (!confirmed) {
      return;
    }

    setSlides((currentSlides) => currentSlides.filter((currentSlide) => currentSlide.id !== id));
  }

  function handleSaveSlide(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = formValues.title.trim();
    const trimmedImage = formValues.image.trim();
    const parsedOrder = Number.parseInt(formValues.order, 10);

    if (!trimmedTitle || !trimmedImage || Number.isNaN(parsedOrder) || parsedOrder < 1) {
      return;
    }

    const nextSlide: SlideRow = {
      id: editingSlide ? editingSlide.id : nextSlideId,
      title: trimmedTitle,
      image: trimmedImage,
      order: parsedOrder,
      isActive: formValues.isActive,
    };

    setSlides((currentSlides) => {
      if (editingSlide) {
        return sortSlides(
          currentSlides.map((slide) => (slide.id === editingSlide.id ? nextSlide : slide))
        );
      }

      return sortSlides([...currentSlides, nextSlide]);
    });

    setIsFormOpen(false);
    setEditingSlide(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Slides</h1>
          <p className="text-blue-600">Manage homepage slider images</p>
        </div>
        <Button
          type="button"
          onClick={openCreateDialog}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Slide
        </Button>
      </div>

      <Card className="border-blue-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-blue-950">Slides Data Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Order</TableHead>
                <TableHead className="w-36">Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-28">Status</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slides.map((slide) => (
                <TableRow key={slide.id}>
                  <TableCell className="font-medium">{slide.order}</TableCell>
                  <TableCell>
                    <div className="relative h-14 w-28 overflow-hidden rounded-md border border-blue-100 bg-blue-50">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-blue-950">{slide.title}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        slide.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {slide.isActive ? "Active" : "Hidden"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditDialog(slide)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteSlide(slide.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingSlide ? "Edit Slide" : "Add Slide"}</DialogTitle>
            <DialogDescription>
              Update the slide title, image, order, and visibility.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSaveSlide}>
            <div className="space-y-2">
              <Label htmlFor="slide-title">Title</Label>
              <Input
                id="slide-title"
                value={formValues.title}
                onChange={(event) =>
                  setFormValues((currentValues) => ({
                    ...currentValues,
                    title: event.target.value,
                  }))
                }
                placeholder="Enter slide title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slide-image">Image path</Label>
              <Input
                id="slide-image"
                value={formValues.image}
                onChange={(event) =>
                  setFormValues((currentValues) => ({
                    ...currentValues,
                    image: event.target.value,
                  }))
                }
                placeholder="/images/slides/Slide-1.jpeg"
              />
              {formValues.image ? (
                <div className="relative h-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <Image
                    src={formValues.image}
                    alt={formValues.title || "Slide preview"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slide-order">Order</Label>
                <Input
                  id="slide-order"
                  type="number"
                  min={1}
                  value={formValues.order}
                  onChange={(event) =>
                    setFormValues((currentValues) => ({
                      ...currentValues,
                      order: event.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slide-status">Status</Label>
                <select
                  id="slide-status"
                  value={formValues.isActive ? "active" : "hidden"}
                  onChange={(event) =>
                    setFormValues((currentValues) => ({
                      ...currentValues,
                      isActive: event.target.value === "active",
                    }))
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="active">Active</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingSlide ? "Save Changes" : "Create Slide"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
