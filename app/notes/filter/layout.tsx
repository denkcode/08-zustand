import css from '@/app/notes/filter/LayoutNotes.module.css'


type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode
};

const NotesLayout = ({ children, sidebar }: Props) => {
    return (
        <section>
            <div className={css.container}>
                <div className={css.sidebar}>{sidebar}</div>
                <div className={css.notesWrapper}>{children}</div>
            </div>
        </section>
    );
};

export default NotesLayout