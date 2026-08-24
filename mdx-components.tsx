import type {MDXComponents} from 'mdx/types';
import type {ComponentPropsWithoutRef} from 'react';

function classNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(' ');
}

function Heading({className, ...props}: ComponentPropsWithoutRef<'h1'>) {
  return <h1 className={classNames('article-heading', 'article-heading-1', className)} {...props} />;
}

function Subheading({className, ...props}: ComponentPropsWithoutRef<'h2'>) {
  return <h2 className={classNames('article-heading', 'article-heading-2', className)} {...props} />;
}

function MinorHeading({className, ...props}: ComponentPropsWithoutRef<'h3'>) {
  return <h3 className={classNames('article-heading', 'article-heading-3', className)} {...props} />;
}

function Table({className, ...props}: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="article-table-wrap">
      <table className={classNames('article-table', className)} {...props} />
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: Heading,
    h2: Subheading,
    h3: MinorHeading,
    p: ({className, ...props}: ComponentPropsWithoutRef<'p'>) => (
      <p className={classNames('article-paragraph', className)} {...props} />
    ),
    ul: ({className, ...props}: ComponentPropsWithoutRef<'ul'>) => (
      <ul className={classNames('article-list', className)} {...props} />
    ),
    ol: ({className, ...props}: ComponentPropsWithoutRef<'ol'>) => (
      <ol className={classNames('article-list', 'article-list-ordered', className)} {...props} />
    ),
    li: ({className, ...props}: ComponentPropsWithoutRef<'li'>) => (
      <li className={classNames('article-list-item', className)} {...props} />
    ),
    strong: ({className, ...props}: ComponentPropsWithoutRef<'strong'>) => (
      <strong className={classNames('article-strong', className)} {...props} />
    ),
    a: ({className, ...props}: ComponentPropsWithoutRef<'a'>) => (
      <a className={classNames('article-link', className)} {...props} />
    ),
    blockquote: ({className, ...props}: ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote className={classNames('article-quote', className)} {...props} />
    ),
    pre: ({className, ...props}: ComponentPropsWithoutRef<'pre'>) => (
      <pre className={classNames('article-code-block', className)} {...props} />
    ),
    code: ({className, ...props}: ComponentPropsWithoutRef<'code'>) => (
      <code className={classNames('article-code', className)} {...props} />
    ),
    table: Table,
    thead: ({className, ...props}: ComponentPropsWithoutRef<'thead'>) => (
      <thead className={classNames('article-table-head', className)} {...props} />
    ),
    tr: ({className, ...props}: ComponentPropsWithoutRef<'tr'>) => (
      <tr className={classNames('article-table-row', className)} {...props} />
    ),
    th: ({className, ...props}: ComponentPropsWithoutRef<'th'>) => (
      <th className={classNames('article-table-heading', className)} {...props} />
    ),
    td: ({className, ...props}: ComponentPropsWithoutRef<'td'>) => (
      <td className={classNames('article-table-cell', className)} {...props} />
    ),
    ...components
  };
}
