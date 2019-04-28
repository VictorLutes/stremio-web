const React = require('react');
const PropTypes = require('prop-types');
const classnames = require('classnames');
const UrlUtils = require('url');
const Icon = require('stremio-icons/dom');
const { Input } = require('stremio-navigation');
const useLocationHash = require('../../useLocationHash');
const styles = require('./styles');

const NavBarButton = React.memo(({ className, icon, label, href, onClick }) => {
    const locationHash = useLocationHash();
    const active = React.useMemo(() => {
        const locationHashPath = locationHash.startsWith('#') ? locationHash.slice(1) : '';
        const hrefHashPath = typeof href === 'string' && href.startsWith('#') ? href.slice(1) : '';
        const { pathname: locationPathname } = UrlUtils.parse(locationHashPath);
        const { pathname: hrefPathname } = UrlUtils.parse(hrefHashPath);
        return locationPathname === hrefPathname;
    }, [href, locationHash]);
    const inputType = typeof onClick === 'function' ? 'button' : 'link';
    return (
        <Input className={classnames(className, styles['nav-bar-button-container'], 'focusable-with-border', { 'active': active })} type={inputType} href={href} onClick={onClick}>
            <Icon className={styles['icon']} icon={icon} />
            <div className={styles['label']}>{label}</div>
        </Input>
    );
});

NavBarButton.displayName = 'NavBarButton';

NavBarButton.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func
};

module.exports = NavBarButton;
