
import { ArticleForm } from "@/components/article-form";

export default function CreateArticlePage() {
    return (
        <div className="p-4 sm:p-6 md:p-8">
             <header className="mb-8">
                <h1 className="text-2xl font-bold font-headline">Create New Article</h1>
                <p className="text-muted-foreground">Fill out the form below to publish a new article or case study.</p>
            </header>
            <ArticleForm />
        </div>
    )
}
