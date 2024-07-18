#include <bits/stdc++.h>
#define ll             long long
#define int            ll
#define pb             push_back
#define ld             long double
#define lala           for(ll i=0;i<n;i++)
#define si             set <int>
#define vi             vector <int>
#define pii            pair <int, int>
#define vpi            vector <pii>
#define vpp            vector <pair<int, pii>>
#define mii            map <int, int>
#define mpi            map <pii, int>
#define spi            set <pii>
using namespace std;
const int MOD = 1e9 + 7;
ll gcd(ll a, ll b) {if (b > a) {return gcd(b, a);} if (b == 0) {return a;} return gcd(b, a % b);}
vector<ll> sieve(int n) {int*arr = new int[n + 1](); vector<ll> vect; for (int i = 2; i <= n; i++)if (arr[i] == 0) {vect.push_back(i); for (int j = 2 * i; j <= n; j += i)arr[j] = 1;} return vect;}
void vin( vector<int> &v , int n ){for (int i = 0; i < n; i++){int x ;cin >> x; v.push_back(x);}}
void vout(vector<int> &v){for (int i = 0; i < v.size(); i++){cout << v[i] << " " ;}cout << endl;}
long long lcm(int a, int b){    return (a / gcd(a, b)) * b;}
int digits_count(int n){int d=0;while(n != 0){d++;n /=10;}return d;}

bool isprime(int n){
    if(n<=1){
        return false;
    }
    if(n<=3){
        return true;
    }
     if(n%2==0 || n%3==0){
            return false;
        }
    for(int i=5;i*i<=n;i+=6){
        if(n%i==0 || n%(i+2)==0){
            return false;
        }
    }
    return true;
}

void aditya()
{
    int a;
    cin>>a;
    int n1=a;
    while(!isprime(n1)){
        n1++;
    }    
    int n2=n1+1;
    while(!isprime(n2)){
        n2++;
    }
    cout<<n1*n2<<endl;
}
int32_t main()
{
    int t=1;
    cin>>t;
    while(t--)
    {
        aditya();
    }
}