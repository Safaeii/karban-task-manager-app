
import { useEffect, useState } from "react";

import { FiPlus, FiSearch, FiTag } from "react-icons/fi";

import { useAuthContext } from "../../auth/hooks/useAuthContext";

import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from "../api/tagsApi";

import type { Tag } from "../types/tag";

import TagCard from "../components/TagCard";
import CreateTagForm from "../components/CreateTagForm";

function TagsPage() {
  const { user } = useAuthContext();

  const [tags, setTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);

const loading = Boolean(user?.id) && loadedUserId !== (user?.id ?? null);

  // دریافت برچسب‌ها
  useEffect(() => {
    if (!user?.id) return;

    const userId = user.id;
    let isActive = true;

    async function loadTags() {
      try {
        const data = await getTags(userId);

        if (!isActive) return;

        setTags(data);
      } catch (error) {
        if (isActive) {
          console.error("Error loading tags:", error);
        }
      } finally {
        if (isActive) {
          setLoadedUserId(userId);
        }
      }
    }

    void loadTags();

    return () => {
      isActive = false;
    };
  }, [user?.id]);

  // ایجاد برچسب
  async function handleCreateTag(data: {
    name: string;
    color: string;
  }) {
    if (!user?.id) return;

    const userId = user.id;

    try {
      const newTag = await createTag(userId, data);

      setTags((prev) => [...prev, newTag]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating tag:", error);
      alert("ایجاد برچسب با مشکل مواجه شد. نام برچسب تکراری نباشد.");
    }
  }

  // ویرایش برچسب
  async function handleUpdateTag(data: {
    name: string;
    color: string;
  }) {
    if (!user?.id || !editingTag) return;

    const userId = user.id;

    try {
      const updatedTag = await updateTag(
        editingTag.id,
        userId,
        data
      );

      setTags((prev) =>
        prev.map((tag) =>
          tag.id === updatedTag.id ? updatedTag : tag
        )
      );

      setEditingTag(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating tag:", error);
      alert("ویرایش برچسب با مشکل مواجه شد.");
    }
  }

  // حذف برچسب
  async function handleDeleteTag(tagId: string) {
    if (!user?.id) return;

    const userId = user.id;

    const confirmed = window.confirm(
      "آیا از حذف این برچسب مطمئن هستید؟"
    );

    if (!confirmed) return;

    try {
      await deleteTag(tagId, userId);

      setTags((prev) =>
        prev.filter((tag) => tag.id !== tagId)
      );
    } catch (error) {
      console.error("Error deleting tag:", error);
      alert("حذف برچسب با مشکل مواجه شد.");
    }
  }

  // جست‌وجوی برچسب‌ها
  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main dir="rtl" className="space-y-6">

      {/* عنوان صفحه */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#26364A]">
            برچسب‌ها
          </h1>

          <p className="mt-2 text-sm text-[#8493A5]">
            برچسب‌های وظایف خود را مدیریت کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingTag(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#7DA9D8] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#6897C9]"
        >
          <FiPlus size={18} />
          افزودن برچسب
        </button>
      </div>

      {/* فرم افزودن و ویرایش */}
      {showForm && (
        <CreateTagForm
          key={editingTag?.id ?? "new"}
          initialTag={editingTag}
          onSubmit={
            editingTag ? handleUpdateTag : handleCreateTag
          }
          onCancel={() => {
            setShowForm(false);
            setEditingTag(null);
          }}
        />
      )}

      {/* جست‌وجو */}
      <div className="relative">
        <FiSearch
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8493A5]"
          size={19}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جست‌وجوی برچسب..."
          className="w-full rounded-xl border border-[#E8EEF5] bg-white py-3 pr-12 pl-4 text-sm text-[#26364A] outline-none transition focus:border-[#7DA9D8]"
        />
      </div>

      {/* لیست برچسب‌ها */}
      {loading ? (
        <div className="py-12 text-center text-[#8493A5]">
          در حال دریافت برچسب‌ها...
        </div>
      ) : !user?.id ? (
        <div className="py-12 text-center text-[#8493A5]">
          برای مشاهده برچسب‌ها وارد حساب کاربری شوید.
        </div>
      ) : filteredTags.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#DCE5EF] bg-white py-16 text-center">
          <FiTag
            size={38}
            className="mx-auto text-[#B8C8D9]"
          />

          <h3 className="mt-4 font-bold text-[#26364A]">
            {search
              ? "برچسبی پیدا نشد"
              : "هنوز برچسبی ایجاد نکرده‌اید"}
          </h3>

          <p className="mt-2 text-sm text-[#8493A5]">
            {search
              ? "عبارت جست‌وجو را تغییر دهید."
              : "برای شروع، اولین برچسب خود را بسازید."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTags.map((tag) => (
            <TagCard
              key={tag.id}
              tag={tag}
              taskCount={0}
              onEdit={(selectedTag) => {
                setEditingTag(selectedTag);
                setShowForm(true);
              }}
              onDelete={handleDeleteTag}
            />
          ))}
        </div>
      )}

    </main>
  );
}

export default TagsPage;
