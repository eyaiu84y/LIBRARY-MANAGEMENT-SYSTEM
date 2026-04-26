-- Decrement available_copies (called when a book is issued)
create or replace function decrement_available_copies(book_id uuid)
returns void as $$
  update books
  set available_copies = greatest(available_copies - 1, 0)
  where id = book_id;
$$ language sql security definer;

-- Increment available_copies (called when a book is returned)
create or replace function increment_available_copies(book_id uuid)
returns void as $$
  update books
  set available_copies = least(available_copies + 1, total_copies)
  where id = book_id;
$$ language sql security definer;

-- Auto-mark overdue transactions (run this as a cron or manually)
create or replace function mark_overdue_transactions()
returns void as $$
  update transactions
  set status = 'overdue'
  where status = 'issued'
    and due_date < now();
$$ language sql security definer;

-- NOTE: The 3 lines below are only needed if realtime is NOT already enabled.
-- If you get "already member of publication" errors, skip them — realtime is already on.
-- alter publication supabase_realtime add table books;
-- alter publication supabase_realtime add table transactions;
-- alter publication supabase_realtime add table profiles;
