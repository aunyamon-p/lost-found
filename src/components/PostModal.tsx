import { X, MapPin, Calendar, User, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Post, categoryLabels } from '@/types/post';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PostModalProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
}

export function PostModal({ post, open, onClose }: PostModalProps) {
  const [currentImage, setCurrentImage] = useState(0);

  if (!post) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <DialogTitle className="sr-only">{post.title}</DialogTitle>
        
        {/* Image Gallery */}
        <div className="relative aspect-[16/10] bg-muted">
          {post.images.length > 0 ? (
            <>
              <img
                src={post.images[currentImage]}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              {post.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {post.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={cn(
                          'h-2 w-2 rounded-full transition-all',
                          idx === currentImage
                            ? 'bg-background w-4'
                            : 'bg-background/50 hover:bg-background/80'
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              ไม่มีรูปภาพ
            </div>
          )}
          
          {/* Type Badge */}
          <div
            className={cn(
              'absolute left-4 top-4 rounded-full px-4 py-1.5 text-sm font-medium',
              post.type === 'lost'
                ? 'bg-lost text-lost-foreground'
                : 'bg-found text-found-foreground'
            )}
          >
            {post.type === 'lost' ? 'ของหาย' : 'เจอของ'}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all hover:bg-background"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-2 text-sm text-muted-foreground">
            {categoryLabels[post.category]}
          </div>
          
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            {post.title}
          </h2>

          <p className="mb-6 text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {post.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.authorName}
            </span>
          </div>

          <Button className="w-full gap-2" size="lg">
            <MessageCircle className="h-5 w-5" />
            ติดต่อ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
