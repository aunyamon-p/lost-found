import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register';

interface AuthProps {
  onLogin: (user: { id: string; name: string; email: string }) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - ในการใช้งานจริงต้องเชื่อมต่อ Backend
    if (mode === 'login') {
      // Mock login
      const mockUser = {
        id: 'mock-user-1',
        name: email.split('@')[0],
        email: email,
      };
      onLogin(mockUser);
      toast({
        title: 'เข้าสู่ระบบสำเร็จ',
        description: `ยินดีต้อนรับ ${mockUser.name}`,
      });
      navigate('/home');
    } else {
      // Mock register
      const mockUser = {
        id: 'mock-user-1',
        name: name,
        email: email,
      };
      onLogin(mockUser);
      toast({
        title: 'สมัครสมาชิกสำเร็จ',
        description: `ยินดีต้อนรับ ${name}`,
      });
      navigate('/home');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground">
            <span className="text-3xl font-bold text-background">L</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Lost & Found</h1>
          <p className="mt-2 text-muted-foreground">ค้นหาของที่หายหรือแจ้งพบของ</p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          {/* Mode Toggle */}
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={cn(
                'flex-1 rounded-md py-2 text-sm font-medium transition-all',
                mode === 'login'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={cn(
                'flex-1 rounded-md py-2 text-sm font-medium transition-all',
                mode === 'register'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              สมัครสมาชิก
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ชื่อ"
                  className="pl-10"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="อีเมล"
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน"
                className="pl-10 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg">
              {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          ระบบสำหรับนักศึกษาเท่านั้น
        </p>
      </div>
    </div>
  );
}
