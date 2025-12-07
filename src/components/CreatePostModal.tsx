import { useState } from 'react';
import { X, Upload, Image as ImageIcon, CreditCard, BookOpen, Laptop, Package, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PostType, Category } from '@/types/post';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
}

const types = [
  { id: 'lost' as const, icon: Search, label: 'ของหาย' },
  { id: 'found' as const, icon: Eye, label: 'เจอของ' },
];

const categories = [
  { id: 'card' as const, icon: CreditCard, label: 'บัตร' },
  { id: 'school' as const, icon: BookOpen, label: 'อุปกรณ์การเรียน' },
  { id: 'it' as const, icon: Laptop, label: 'IT/อุปกรณ์' },
  { id: 'other' as const, icon: Package, label: 'อื่นๆ' },
];

export function CreatePostModal({ open, onClose }: CreatePostModalProps) {
  const { toast } = useToast();
  const [type, setType] = useState<PostType>('lost');
  const [category, setCategory] = useState<Category>('other');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim() || !description.trim() || !location.trim() || !date) {
      toast({
        title: 'กรุณากรอกข้อมูลให้ครบ',
        description: 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'ต้องเข้าสู่ระบบก่อน',
      description: 'กรุณาเชื่อมต่อ Lovable Cloud เพื่อใช้งานฟีเจอร์นี้',
    });
  };

  const resetForm = () => {
    setType('lost');
    setCategory('other');
    setTitle('');
    setDescription('');
    setLocation('');
    setDate('');
    setImages([]);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">ลงประกาศ</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              ประเภท
            </label>
            <div className="grid grid-cols-2 gap-2">
              {types.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setType(id)}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-all',
                    type === id
                      ? id === 'lost'
                        ? 'border-lost bg-lost/10 text-lost'
                        : 'border-found bg-found/10 text-found'
                      : 'border-border hover:border-muted-foreground/30'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              หมวดหมู่
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border-2 p-3 text-sm transition-all',
                    category === id
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-muted-foreground/30'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              ชื่อเรื่อง
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น บัตรนักศึกษา, กระเป๋าสตางค์"
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              รายละเอียด
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="อธิบายรายละเอียดเพิ่มเติม เช่น ลักษณะ สี ขนาด"
              rows={3}
              maxLength={500}
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              สถานที่
            </label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="เช่น โรงอาหาร, ห้องสมุด"
              maxLength={100}
            />
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              วันที่
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              รูปภาพ (สูงสุด 5 รูป)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute right-1 top-1 rounded-full bg-foreground/80 p-1"
                  >
                    <X className="h-3 w-3 text-background" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-muted-foreground/30 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Upload className="h-6 w-6" />
                    <span className="mt-1 text-xs">เพิ่มรูป</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            variant={type === 'lost' ? 'lost' : 'found'}
          >
            {type === 'lost' ? 'ประกาศของหาย' : 'ประกาศเจอของ'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
