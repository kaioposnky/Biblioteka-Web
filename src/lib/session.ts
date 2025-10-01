import {redirect} from 'next/navigation';
import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {Session} from 'next-auth';

/**
 * Checa e obtêm a sessão do usuário logado
 * Se o usuário não estiver logado é redirecionado para a página de login
 * @returns {Promise<Session>} Sessão do usuário
 */
export async function checkSession(): Promise<Session> {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/auth/login');
    }
    return session;
}