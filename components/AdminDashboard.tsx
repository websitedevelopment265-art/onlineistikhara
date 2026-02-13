
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenTool, 
  Layout, 
  LogOut, 
  Image as ImageIcon, 
  CheckCircle, 
  Send,
  PlusCircle,
  FileText
} from 'lucide-react';

interface Post {
  title: string;
  category: string;
  content: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'posts'>('editor');
  const [posts, setPosts] = useState<Post[]>([]);
  const [formData, setFormData] = useState<Post>({
    title: '',
    category: 'Istikhara',
    content: ''
  });
  const [isPublishing, setIsPublishing] = useState(false);

  const categories = ['Istikhara', 'Marriage', 'Spiritual Healing', 'Black Magic', 'Success'];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    
    // Simulate API call
    setTimeout(() => {
      setPosts([formData, ...posts]);
      setFormData({ title: '', category: 'Istikhara', content: '' });
      setIsPublishing(false);
      setActiveTab('posts');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-charcoal flex text-ivory">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gold/10 flex flex-col p-8 space-y-12 relative z-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-black text-charcoal">N</div>
          <span className="font-serif font-bold text-lg text-white premium-heading">ADMIN PANEL</span>
        </div>

        <nav className="flex-1 space-y-4">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'editor' ? 'bg-gold text-charcoal shadow-lg' : 'hover:bg-white/5 text-ivory/60'}`}
          >
            <PenTool size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Write Blog</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'posts' ? 'bg-gold text-charcoal shadow-lg' : 'hover:bg-white/5 text-ivory/60'}`}
          >
            <Layout size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Posts</span>
          </button>
        </nav>

        <button 
          onClick={onLogout}
          className="flex items-center space-x-4 px-6 py-4 text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all mt-auto"
        >
          <LogOut size={20} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Portal</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <PlusCircle size={300} className="text-gold" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'editor' ? (
              <motion.div 
                key="editor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div>
                  <h1 className="text-4xl font-serif font-bold text-white mb-2 premium-heading">Create Sacred Content</h1>
                  <p className="text-gold/60 text-[11px] font-black uppercase tracking-[0.4em]">Draft a new roohani insight</p>
                </div>

                <form onSubmit={handlePublish} className="glass p-10 rounded-[3rem] border border-gold/10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gold/40 ml-2">Post Title (Eng/Urdu)</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-gold/20 rounded-2xl p-5 text-ivory focus:outline-none focus:border-gold transition-all urdu-font text-xl"
                        placeholder="عنوان درج کریں..."
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gold/40 ml-2">Category</label>
                      <select 
                        className="w-full bg-white/5 border border-gold/20 rounded-2xl p-5 text-ivory focus:outline-none focus:border-gold transition-all appearance-none"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-charcoal">{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gold/40 ml-2">Content Area</label>
                    <textarea 
                      required
                      rows={12}
                      className="w-full bg-white/5 border border-gold/20 rounded-[2rem] p-8 text-ivory focus:outline-none focus:border-gold transition-all urdu-font text-2xl leading-relaxed"
                      placeholder="اپنا روحانی پیغام لکھیں..."
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-6">
                    <div className="flex space-x-4">
                      <button type="button" className="flex items-center space-x-3 px-6 py-4 rounded-xl bg-white/5 border border-gold/10 text-[9px] font-black uppercase tracking-widest hover:bg-gold/10 transition-all">
                        <ImageIcon size={16} className="text-gold" />
                        <span>Add Image</span>
                      </button>
                    </div>

                    <button 
                      type="submit"
                      disabled={isPublishing}
                      className="flex items-center space-x-4 bg-gold text-charcoal px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] mirror-button shadow-2xl disabled:opacity-50"
                    >
                      {isPublishing ? 'Transcending...' : (
                        <>
                          <span>Publish Post</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-serif font-bold text-white mb-2 premium-heading">Sacred Archive</h1>
                    <p className="text-gold/60 text-[11px] font-black uppercase tracking-[0.4em]">Managing {posts.length} spiritual entries</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('editor')}
                    className="flex items-center space-x-3 text-gold hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    <PlusCircle size={20} />
                    <span>New Post</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {posts.length === 0 ? (
                    <div className="glass p-20 rounded-[3rem] text-center space-y-6">
                      <FileText size={48} className="mx-auto text-gold/20" />
                      <p className="text-ivory/40 uppercase tracking-[0.3em] text-[10px] font-black">No messages archived yet</p>
                    </div>
                  ) : (
                    posts.map((post, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="glass p-8 rounded-[2rem] border border-gold/10 flex items-center justify-between group"
                      >
                        <div className="space-y-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-gold/40 border border-gold/20 px-3 py-1 rounded-lg">{post.category}</span>
                          <h3 className="text-xl font-serif font-bold text-white urdu-font" dir="rtl">{post.title}</h3>
                        </div>
                        <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                          <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest flex items-center">
                            <CheckCircle size={14} className="mr-2" /> Live
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
