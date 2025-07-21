import { Input } from '@/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useJsonPlaceholderCreatePost } from '@/hooks/useJsonPlaceholderCreatePost';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const formSchema = yup
  .object({
    title: yup.string().required('Título é obrigatório'),
    body: yup.string().required('Mensagem é obrigatória'),
    userId: yup
      .number()
      .typeError('ID do usuário deve ser um número')
      .required('ID do usuário é obrigatório'),
  })
  .required();

type FormData = {
  title: string;
  body: string;
  userId: number;
};

export const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const {
    mutate: createPost,
    data: postResult,
    isPending,
    isError,
    error,
    isSuccess,
  } = useJsonPlaceholderCreatePost();

  const onSubmit = (data: FormData) => {
    createPost(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="Título" {...register('title')} error={errors.title?.message} />
        <Input label="Mensagem" {...register('body')} error={errors.body?.message} />
        <Input
          label="ID do Usuário"
          type="number"
          {...register('userId')}
          error={errors.userId?.message}
        />
        <Button variant="primary" type="submit" className="w-100 rounded mt-4" disabled={isPending}>
          {isPending ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>

      {isError && (
        <Alert variant="danger" className="mt-3">
          Erro ao criar post: {error instanceof Error ? error.message : 'Erro desconhecido'}
        </Alert>
      )}
      {isSuccess && postResult && (
        <Alert variant="success" className="mt-3">
          Post criado com sucesso! ID: <b>{postResult.id}</b>
        </Alert>
      )}
    </div>
  );
};
