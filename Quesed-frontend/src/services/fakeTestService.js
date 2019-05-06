const tests = [
  {
    id: 'q2f2feefef3f4',
    verified: true,
    question:
      'Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World?',
    answers: [
      {
        answer: 'Hello Val',
        isCorrect: false,
      },
      {
        answer: 'Hello World',
        isCorrect: true,
      },
      {
        answer: 'Hello Boosh',
        isCorrect: false,
      },
      {
        answer: 'Hello Art',
        isCorrect: false,
      },
    ],
    author: 'Artem',
    views: 22,
    likes: 13,
    dislikes: 2,
    isLiked: true,
    isDisliked: false,
    isVisited: true,
    isAnswered: true,
    isAnsweredCorrectly: true,
  },
  {
    id: 'q2f2fee25f3f4',
    verified: false,
    question: 'Hello Valbat?',
    answers: [
      {
        answer: 'Hello Val',
        isCorrect: true,
      },
      {
        answer: 'Hello World',
        isCorrect: false,
      },
      {
        answer: 'Hello Boosh',
        isCorrect: false,
      },
      {
        answer: 'Hello Art',
        isCorrect: false,
      },
    ],
    description: 'This is Hello Val',
    author: 'Valbat',
    views: 12,
    likes: 2,
    dislikes: 22,
    isLiked: false,
    isDisliked: false,
    isVisited: false,
    isAnswered: false,
    isAnsweredCorrectly: false,
  },
  {
    id: 'q2f2fwafef3f4',
    verified: true,
    question: 'Hello Boosh?',
    answers: [
      {
        answer: 'Hello Val',
        isCorrect: false,
      },
      {
        answer: 'Hello World',
        isCorrect: false,
      },
      {
        answer: 'Hello Boosh',
        isCorrect: true,
      },
      {
        answer: 'Hello Art',
        isCorrect: false,
      },
    ],
    author: 'Boosh',
    views: 15,
    likes: 15,
    dislikes: 22,
    isLiked: false,
    isDisliked: false,
    isVisited: true,
    isAnswered: true,
    isAnsweredCorrectly: false,
  },
  {
    id: 'q2f2fwa1ef3f4',
    verified: true,
    question: 'Hello Valik?',
    answers: [
      {
        answer: 'Hello Valik',
        isCorrect: true,
      },
      {
        answer: 'Hello World',
        isCorrect: false,
      },
      {
        answer: 'Hello Boosh',
        isCorrect: false,
      },
      {
        answer: 'Hello Art',
        isCorrect: false,
      },
    ],
    author: 'Valik',
    views: 34,
    likes: 44,
    dislikes: 21,
    isLiked: false,
    isDisliked: false,
    isVisited: true,
    isAnswered: true,
    isAnsweredCorrectly: true,
  },
  {
    id: 'q2f2fwrfef3f4',
    verified: false,
    question: 'Hello Nikita?',
    answers: [
      {
        answer: 'Hello Val',
        isCorrect: false,
      },
      {
        answer: 'Hello World',
        isCorrect: false,
      },
      {
        answer: 'Hello Nikita',
        isCorrect: true,
      },
      {
        answer: 'Hello Art',
        isCorrect: false,
      },
    ],
    author: 'Nikita',
    views: 19,
    likes: 61,
    dislikes: 51,
    isLiked: false,
    isDisliked: true,
    isVisited: true,
    isAnswered: false,
    isAnsweredCorrectly: false,
  },
];

export const getTests = () => {
  const data = [...tests];
  return data;
};

export const getTest = id => tests.find(t => t.id === id);
