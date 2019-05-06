export function mapToTestCard(data) {
  return {
    id: data.id,
    isVerified: data.verified,
    question: data.question,
    author: data.author,
    views: data.views,
    likes: data.likes,
    dislikes: data.dislikes
  };
}

export default {
  mapToTestCard
};
