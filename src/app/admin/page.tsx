import { getAllMessages, approveMessage, deleteMessage, authenticateAdmin, isAdminAuthenticated, logoutAdmin } from '@/actions/messageActions';
import { revalidatePath } from 'next/cache';
import styles from './admin.module.css';

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Admin Login</h1>
          <form action={async (formData) => {
            'use server';
            const password = formData.get('password') as string;
            await authenticateAdmin(password);
            revalidatePath('/admin');
          }} className={styles.form}>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password" 
              className={styles.input} 
              required
            />
            <button type="submit" className={styles.button}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  const messages = await getAllMessages();

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Guestbook Moderation</h1>
        <form action={async () => {
          'use server';
          await logoutAdmin();
        }}>
          <button type="submit" className={styles.logoutButton}>Logout</button>
        </form>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>No messages found.</td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg.id} className={msg.isApproved ? styles.approvedRow : styles.pendingRow}>
                  <td>{msg.createdAt.toLocaleDateString()}</td>
                  <td className={styles.nameCell}>{msg.name}</td>
                  <td className={styles.messageCell}>{msg.content}</td>
                  <td>
                    <span className={msg.isApproved ? styles.statusApproved : styles.statusPending}>
                      {msg.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    {!msg.isApproved && (
                      <form action={async () => {
                        'use server';
                        await approveMessage(msg.id);
                      }}>
                        <button type="submit" className={styles.approveButton}>Approve</button>
                      </form>
                    )}
                    <form action={async () => {
                      'use server';
                      await deleteMessage(msg.id);
                    }}>
                      <button type="submit" className={styles.deleteButton}>Delete</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
