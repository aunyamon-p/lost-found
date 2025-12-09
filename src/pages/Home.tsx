import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TypeFilter } from '@/components/TypeFilter';
import { PostCard } from '@/components/PostCard';
import { PostModal } from '@/components/PostModal';
import { CreatePostModal } from '@/components/CreatePostModal';
import { EmptyState } from '@/components/EmptyState';
import { mockPosts } from '@/data/mockPosts';
import { Post, PostType, Category } from '@/types/post';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface HomeProps {
  user: { id: string; name: string; email: string };
  onLogout: () => void;
}

export default function Home({ user, onLogout }: HomeProps) {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deletePost, setDeletePost] = useState<Post | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesType = selectedType === 'all' || post.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [posts, searchQuery, selectedCategory, selectedType]);

  const handleCreatePost = (postData: Omit<Post, 'id' | 'createdAt' | 'status'>) => {
    if (editPost) {
      // Update existing post
      setPosts(prev => prev.map(p => 
        p.id === editPost.id 
          ? { ...p, ...postData }
          : p
      ));
      setEditPost(null);
    } else {
      // Create new post
      const newPost: Post = {
        ...postData,
        id: `post-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      setPosts(prev => [newPost, ...prev]);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditPost(post);
    setShowCreateModal(true);
  };

  const handleDeletePost = (post: Post) => {
    setDeletePost(post);
  };

  const confirmDelete = () => {
    if (deletePost) {
      setPosts(prev => prev.filter(p => p.id !== deletePost.id));
      toast({
        title: 'ลบโพสต์สำเร็จ',
        description: 'โพสต์ของคุณถูกลบแล้ว',
      });
      setDeletePost(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCreatePost={() => {
          setEditPost(null);
          setShowCreateModal(true);
        }}
        onSearch={() => {}}
        onLogout={onLogout}
        userName={user.name}
      />

      <main className="container py-6">
        {/* Hero Section */}
        <section className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
            Lost & Found
          </h1>
          <p className="text-muted-foreground">
            ค้นหาของที่หายหรือแจ้งพบของ
          </p>
        </section>

        {/* Search */}
        <section className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="ค้นหาชื่อ, รายละเอียด, สถานที่..."
          />
        </section>

        {/* Filters */}
        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TypeFilter selected={selectedType} onSelect={setSelectedType} />
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </section>

        {/* Results Count */}
        <section className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredPosts.length} รายการ
          </p>
        </section>

        {/* Posts Grid */}
        <section>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in"
                >
                  <PostCard
                    post={post}
                    onView={setSelectedPost}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                    isOwner={post.authorId === user.id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState type={searchQuery || selectedCategory !== 'all' || selectedType !== 'all' ? 'no-results' : 'no-posts'} />
          )}
        </section>
      </main>

      {/* Modals */}
      <PostModal
        post={selectedPost}
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
      <CreatePostModal
        open={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditPost(null);
        }}
        onSubmit={handleCreatePost}
        editPost={editPost}
        currentUserId={user.id}
        currentUserName={user.name}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletePost} onOpenChange={() => setDeletePost(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบโพสต์</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบโพสต์ "{deletePost?.title}" หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              ลบโพสต์
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
