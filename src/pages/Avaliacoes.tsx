import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StarRating } from '@/components/StarRating';
import { useReviews } from '@/contexts/ReviewContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Avaliacoes = () => {
  const { reviews, addReview, getAverageRating } = useReviews();
  const { user, isAuthenticated, isEmployee } = useAuth();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');

  const avgRating = getAverageRating();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error('Escreva um comentário');
      return;
    }

    const reviewName = isAuthenticated && user ? (user.user_metadata?.name || user.email?.split('@')[0] || 'Anônimo') : name;
    if (!reviewName.trim()) {
      toast.error('Informe seu nome');
      return;
    }

    const success = await addReview({
      customerName: reviewName,
      rating,
      comment: comment.trim(),
    });

    if (success) {
      toast.success('Avaliação enviada com sucesso!');
      setRating(5);
      setComment('');
      setName('');
    } else {
      toast.error('Erro ao enviar avaliação. Faça login para avaliar.');
    }
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map(r => ({
    rating: r,
    count: reviews.filter(review => review.rating === r).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === r).length / reviews.length) * 100 
      : 0,
  }));

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Avaliações</h1>
          <p className="text-muted-foreground">
            Veja o que nossos clientes dizem sobre nós
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {avgRating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(avgRating)} size="lg" />
                <p className="text-muted-foreground mt-2">
                  {reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}
                </p>

                <div className="mt-6 space-y-2">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="h-3 w-3 text-secondary fill-secondary" />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Review Form - Only for customers */}
            {!isEmployee && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Deixe sua avaliação</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isAuthenticated && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Seu nome</Label>
                        <Input
                          id="name"
                          placeholder="Como você quer ser chamado?"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Sua nota</Label>
                      <div className="flex items-center gap-2">
                        <StarRating
                          rating={rating}
                          size="lg"
                          interactive
                          onRatingChange={setRating}
                        />
                        <span className="text-muted-foreground">({rating}/5)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comment">Comentário</Label>
                      <Textarea
                        id="comment"
                        placeholder="Conte sua experiência..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Avaliação
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {isEmployee && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Como proprietário/funcionário, você não pode enviar avaliações.
                    Esta área é destinada apenas para visualização do feedback dos clientes.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{review.customerName}</h4>
                        <p className="text-xs text-muted-foreground">
                          {review.createdAt.toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avaliacoes;
