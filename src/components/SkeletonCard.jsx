const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-text skeleton-text-medium"></div>
            <div className="skeleton skeleton-text skeleton-text-short"></div>
            <div className="skeleton skeleton-price"></div>
        </div>
    );
};

const SkeletonGrid = ({ count = 8 }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {[...Array(count)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export { SkeletonCard, SkeletonGrid };
