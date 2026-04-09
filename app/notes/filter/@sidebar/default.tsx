import type { NoteTag } from '@/types/note';
import css from '@/app/notes/filter/@sidebar/SidebarNotes.module.css';

const tags: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
const NotesSidebar = async () => {
  return <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <a href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </a>
        </li>
      
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <a href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </a>
        </li>
      ))}
    </ul>

  </div>;
};

export default NotesSidebar;
