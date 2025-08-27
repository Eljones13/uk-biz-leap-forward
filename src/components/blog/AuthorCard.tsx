
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Author } from "@/hooks/useAuthors";

interface AuthorCardProps {
  author: Author;
  variant?: "compact" | "full";
}

export const AuthorCard = ({ author, variant = "compact" }: AuthorCardProps) => {
  if (variant === "compact") {
    return (
      <Link to={`/blog/author/${author.slug}`} className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
        <Avatar className="h-10 w-10">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{author.name}</p>
          {author.role && <p className="text-xs text-muted-foreground">{author.role}</p>}
        </div>
      </Link>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{author.name}</h3>
            {author.role && <Badge variant="secondary" className="mb-2">{author.role}</Badge>}
            {author.bio && <p className="text-muted-foreground mb-3">{author.bio}</p>}
            {author.social && (
              <div className="flex gap-2">
                {author.social.twitter && (
                  <a href={`https://twitter.com/${author.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    Twitter
                  </a>
                )}
                {author.social.linkedin && (
                  <a href={`https://linkedin.com/in/${author.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    LinkedIn
                  </a>
                )}
                {author.social.website && (
                  <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
