import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { TypeFilter } from '@/components/TypeFilter';
import { PostCard } from '@/components/PostCard';
import { PostModal } from '@/components/PostModal';
import { CreatePostModal } from '@/components/CreatePostModal';
import { AuthModal } from '@/components/AuthModal';
import { EmptyState } from '@/components/EmptyState';
import { mockPosts } from '@/data/mockPosts';
import { Post, PostType, Category } from '@/types/post';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

      // Type filter
      const matchesType = selectedType === 'all' || post.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCreatePost={() => setShowCreateModal(true)}
        onSearch={() => {}}
        onAuth={() => setShowAuthModal(true)}
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
                    isOwner={false}
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
        onClose={() => setShowCreateModal(false)}
      />
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default Index;
