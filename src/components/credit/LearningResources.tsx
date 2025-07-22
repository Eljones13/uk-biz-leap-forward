
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Video, 
  ExternalLink, 
  Star, 
  Clock,
  Users,
  TrendingUp
} from "lucide-react";

const books = [
  {
    title: "Finance Your Own Business",
    authors: "Garrett Sutton & Gerri Detweiler",
    rating: 4.7,
    description: "Complete guide to business credit building and funding strategies",
    topics: ["Business Credit", "Funding Strategies", "Legal Structures"],
    difficulty: "Beginner",
    link: "#"
  },
  {
    title: "Building Business Credit: Essential Strategies for Financial Success", 
    authors: "Gerald Lacey",
    rating: 4.5,
    description: "Step-by-step approach to establishing and maintaining strong business credit",
    topics: ["Credit Building", "Credit Repair", "Financial Management"],
    difficulty: "Intermediate",
    link: "#"
  },
  {
    title: "The Entrepreneur's Guide to Business Law",
    authors: "Constance E. Bagley & Craig E. Dauchy",
    rating: 4.6,
    description: "Legal foundations for business operations and credit applications",
    topics: ["Business Law", "Compliance", "Risk Management"],
    difficulty: "Advanced", 
    link: "#"
  }
];

const youtubeChannels = [
  {
    name: "Capital on Tap",
    subscribers: "25K",
    description: "UK business credit advice and funding tips",
    topics: ["Business Credit Cards", "Funding Tips", "UK Banking"],
    recentVideo: "How to Build Business Credit in 2024",
    link: "#"
  },
  {
    name: "UK Business Mentor",
    subscribers: "45K", 
    description: "Comprehensive business guidance including funding strategies",
    topics: ["Business Growth", "Funding", "Mentorship"],
    recentVideo: "5 Funding Mistakes That Kill Startups",
    link: "#"
  },
  {
    name: "Start Up Loans (Official)",
    subscribers: "12K",
    description: "Official government-backed startup funding guidance",
    topics: ["Government Funding", "Startup Loans", "Business Planning"],
    recentVideo: "Government Funding Options for UK Startups",
    link: "#"
  }
];

const courses = [
  {
    title: "The Ultimate Business Credit Blueprint",
    platform: "Udemy",
    rating: 4.8,
    students: 15420,
    duration: "8 hours",
    price: "£49.99",
    description: "Complete system for building business credit from zero to funding",
    modules: [
      "Business Formation & Structure",
      "Credit Bureau Registration", 
      "Trade Credit Establishment",
      "Business Credit Cards",
      "Loan Application Mastery"
    ],
    link: "#"
  },
  {
    title: "UK Business Funding Masterclass",
    platform: "Skillshare",
    rating: 4.6,
    students: 8350,
    duration: "12 hours",
    price: "Free with subscription",
    description: "Everything you need to know about UK business funding options",
    modules: [
      "Traditional Bank Lending",
      "Alternative Finance Options",
      "Government Grants & Support",
      "Investor Funding",
      "Crowdfunding Strategies"
    ],
    link: "#"
  }
];

const newsFeeds = [
  {
    name: "UK Finance News",
    description: "Latest updates on business banking and lending regulations",
    frequency: "Daily",
    topics: ["Banking News", "Regulatory Changes", "Market Updates"]
  },
  {
    name: "Small Business Finance Report",
    description: "Weekly insights on funding trends and opportunities",
    frequency: "Weekly", 
    topics: ["Funding Trends", "Lending Data", "Policy Updates"]
  },
  {
    name: "Credit Industry Insider",
    description: "Monthly deep-dive analysis of credit markets",
    frequency: "Monthly",
    topics: ["Credit Analysis", "Industry Reports", "Expert Insights"]
  }
];

export const LearningResources = () => {
  return (
    <div className="space-y-8">
      {/* Books Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            Essential Books
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground">by {book.authors}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>
                  <Badge variant="outline">{book.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{book.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2">Key Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {book.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Amazon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* YouTube Channels */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Video className="h-6 w-6 mr-2" />
            Expert YouTube Channels
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {youtubeChannels.map((channel, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{channel.name}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{channel.subscribers} subscribers</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{channel.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2">Focus Areas:</h4>
                  <div className="flex flex-wrap gap-1">
                    {channel.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Latest: </span>
                  <span className="text-muted-foreground">{channel.recentVideo}</span>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Channel
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Online Courses */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Recommended Courses
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{course.platform}</Badge>
                  <div className="text-lg font-bold">{course.price}</div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{course.description}</p>
                
                <div>
                  <h4 className="font-medium mb-2">Course Modules:</h4>
                  <ul className="space-y-1">
                    {course.modules.map((module, moduleIndex) => (
                      <li key={moduleIndex} className="text-sm text-muted-foreground flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full">
                  Enroll Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News Feeds */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Industry News & Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsFeeds.map((feed, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{feed.name}</h4>
                    <p className="text-sm text-muted-foreground">{feed.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">{feed.frequency}</Badge>
                      {feed.topics.slice(0, 2).map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Subscribe
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
